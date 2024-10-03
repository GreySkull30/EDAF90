import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import PageNotFound from "./PageNotFound";

const router = createBrowserRouter([

  {
    
    Component: App,
    children: [
      {
        path: "compose-salad",
        Component: ComposeSalad,

        //LAB 4
        //path: "compose-salad"
        //loader: inventoryLoader
        //Component: ComposeSalad
        
      },
      {
        path: "view-order",
        Component: ViewOrder,
        children:[
          {
            path: "confirm/:uuid",
            Component: ViewOrder
          }
        ]
      },
      {
        index: true,
        element: <p>Welcome to my own salad bar</p>
      },
      {
        path: "*",
        Component: PageNotFound
      }
    ]
  }

  
]);
export default router;