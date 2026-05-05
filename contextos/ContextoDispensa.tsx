import { createContext, useContext, useReducer } from 'react';
import dispensa from '../dados/dispensa';

export interface IItemDispensa {
    id: number;
    nome: string;
    qtdDispensa: number;
    qtdLista: number;
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
            
        default:
            return state;
    }
}

export const DispensaProvider = ({ children }: { children?: React.ReactNode }) => {

    const [state, dispatch] = useReducer(reducer, estadoInicial);
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