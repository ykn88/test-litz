import { ReactNode, useContext, useReducer } from "react"
import { Head } from "blitz"
import Header from "app/products/components/Header"
import ItemContext, { ItemContextInterface } from "app/context/ItemContext"
import ItemReducer from "app/reducer/ItemReducer"

type LayoutProps = {
  title?: string
  children: ReactNode
}

export const contextValues:ItemContextInterface = {
  itemQty: 0,
  totalAmount: 0,
  localObject: {},
  id: 0
}

const Layout = ({ title, children }: LayoutProps) => {

  const [state, dispatch] = useReducer(ItemReducer, contextValues)
  
 
  function addValue(qty, amount) {
    console.log(qty)
    dispatch ({
      type: "ADD_ITEM",
      itemQty: qty,
      totalAmount: amount
    })
  }


  function reduceValue(qty, amount) {
    dispatch ({
      type: "REDUCE_ITEM",
      itemQty: qty,
      totalAmount: amount
    })
  }

  function addObject(value:object) {
    dispatch ({
      type: "ADD_OBJECT",
      localObject: value
    })
  }
  
  function removeObject(value:number) {
    dispatch ({
      type: "REMOVE_OBJECT",
      id: value
    })
  }

  return (
    <>
    
      <Head>
        <title>{title || "freshcart"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <ItemContext.Provider value={{...contextValues, addValue, reduceValue, addObject, removeObject}}> 
          {children}
          <Header />
        </ItemContext.Provider>
      <div style={{backgroundColor:'#F3FCF8'}}></div>
      {/* <Footer /> */}
    </>
  )
}

export default Layout
