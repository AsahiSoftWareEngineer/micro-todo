
import './App.css'
import { Route} from "react-router-dom"
import SlideRoutes from "react-slide-routes"
import { MicroTodoContainer } from './components/micro-view/todo/todo.component'
import { MicroProjectContainer } from './components/micro-view/project/project.component'
import { init } from './models/models'
function App() {
  init()
  return (
    <div className='drag w-full h-screen '>
      <SlideRoutes>
        <Route path='/*' element={<MicroProjectContainer/>}/>
        <Route path='project/:id' element={<MicroTodoContainer/>}/>
      </SlideRoutes>
    </div>
  )
}

export default App
