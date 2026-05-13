import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import dispensa from '../dados/dispensa';

export interface IItemDispensa {
    id: number;
    nome: string;
    qtdDispensa: number;
    qtdLista: number;
    comprado: boolean;
}

export interface ISecao {
    id: number;
    nome: string;
    data: IItemDispensa[];
}

export interface IContextoDispensa {
    dispensa: ISecao[];
    dispatch: React.Dispatch<IAction>;
}

export interface IAction {
    type: string;
    payload?: any;
}

const estadoInicial: IContextoDispensa = {
  dispensa: dispensa,
  dispatch: () => {}
};

const ContextoDispensa = createContext<IContextoDispensa | undefined>(undefined);

const reducer = (state: IContextoDispensa, action: IAction) => {

    switch (action.type) {
        
        case 'RESTORE_STATE':
            return {
                ...state,
                ...(action.payload || {}),
            }

        case 'ADICIONAR_SECAO':
            return {
                ...state,
                dispensa: [...state.dispensa, action.payload]
            }     

        case 'REMOVER_SECAO':
            return {
                ...state,
                dispensa: state.dispensa.filter(section => section.id !== action.payload)
            }

        case 'ADICIONAR_ITEM':
            return {
                ...state,
                dispensa: state.dispensa.map(section => {
                    if (section.id === action.payload.secaoId) {
                        return {
                            ...section,
                            data: [...section.data, action.payload.item]
                        };
                    }
                    return section;
                })
            }

        case 'REMOVER_ITEM':
            return {
                ...state,
                dispensa: state.dispensa.map(section => {
                    return {    
                            ...section,
                            data: section.data.filter(item => item.id !== action.payload.itemId)
                    };
                })
            }

        case 'INCREMENTAR_QTD_DISPENSA':
            return {
                ...state,
                dispensa: state.dispensa.map(section => {
                    return {
                        ...section,
                        data: section.data.map(item => {
                            if (item.id === action.payload.itemId) {
                                return { ...item, qtdDispensa: item.qtdDispensa + 1 };
                            }
                            return item;
                        })
                    }
                })                   
            }

        case 'DECREMENTAR_QTD_DISPENSA':
            return {
                ...state,
                dispensa: state.dispensa.map(section => {
                    return {
                        ...section,
                        data: section.data.map(item => {
                            if (item.id === action.payload.itemId) {
                                return { ...item, qtdDispensa: item.qtdDispensa - 1};
                            }
                            return item;
                        })
                    };
                })
            }

        case 'INCREMENTAR_QTD_LISTA':
            return {
                ...state,
                dispensa: state.dispensa.map(section => {
                    return {
                        ...section,
                        data: section.data.map(item => {
                            if (item.id === action.payload.itemId) {
                                return { ...item, qtdLista: item.qtdLista + 1 };
                            }
                            return item;
                        })
                    }
                })                   
            }

        case 'DECREMENTAR_QTD_LISTA':
            return {
                ...state,
                dispensa: state.dispensa.map(section => {
                    return {
                        ...section,
                        data: section.data.map(item => {
                            if (item.id === action.payload.itemId) {
                                return { ...item, qtdLista: item.qtdLista - 1};
                            }
                            return item;
                        })
                    };
                })
            }
            
        case 'INVERTER_COMPRADO':
            return {
                ...state,
                dispensa: state.dispensa.map(section => {
                    return {
                        ...section,
                        data: section.data.map(item => {
                            if (item.id === action.payload.itemId) {
                                return { ...item, comprado: !item.comprado};
                            }
                            return item;
                        })
                    };
                })
            }
            
        default:
            return state;
    }
}

export const DispensaProvider = ({ children }: { children?: React.ReactNode }) => {

    const [state, dispatch] = useReducer(reducer, estadoInicial);
    const [isLoading, setIsLoading] = useState(true);
    
    // Carrega os dados na montagem
    useEffect(() => {
        const loadData = async () => {
            try {
                const savedData = await AsyncStorage.getItem('@state');
                dispatch({ 
                    type: 'RESTORE_STATE', 
                    payload: savedData ? JSON.parse(savedData) : null 
                });                
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } 
        };
        
        loadData();
    }, []);

    // Salva os dados sempre que o estado mudar
    useEffect(() => {
        if (isLoading) return; 

        const saveData = async () => {
            try {
                const stateToSave = {...state};
                await AsyncStorage.setItem('@state', JSON.stringify(stateToSave));
            } catch (error) {   
                console.error('Erro ao salvar dados:', error);
            }
        };

        saveData();
    }, [state]);

    return (
        <ContextoDispensa.Provider value={{ dispensa: state.dispensa, dispatch }}>
            {children}
        </ContextoDispensa.Provider>
    );
}

export const useDispensa = () => {
    const context = useContext(ContextoDispensa);
    if (!context) {
        throw new Error('useDispensa deve ser usado dentro de um DispensaProvider');
    }
    return context;
}