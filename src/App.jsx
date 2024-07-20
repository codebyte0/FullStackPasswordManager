import './App.css'
import Footer from './components/Footer'
import Manager from './components/Manager'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <div className='min-h-[86vh]'>
      <Manager/>
      </div>
      <Footer className="bg-slate-900"/>
    </>
  )
}

export default App
