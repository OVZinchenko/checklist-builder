import { Fragment, useState } from 'react';
import './App.css';
import uniqid from 'uniqid';
import CheckList from './components/CheckList'
import data from './data/data.json'
import { ReactComponent as IconPlus } from './icons/icon-plus.svg'
import { ReactComponent as IconArrow } from './icons/icon-arrow.svg'
import { Task } from './types/types'
import { chooseTaskStatusColor } from './utils/chooseTaskStatusColor';
import { Transition } from '@headlessui/react';

const App = () => {
  const [task, setTask] = useState(data as Task)
  const [hidenCheckLists, setHidenCheckLists] = useState(['Checklist 1'])
  
  const initialCheckList = {
    title: `Checklist ${task.checkLists.length + 1}`,
    checkList: [
    {
      "id": uniqid(),
      "title": "Check item 1",
      "curentStatus": 1,
      "descriptions": [],
      "statuses": ["Not started", "Done", "Fail", "Blocked"]
    },
    {
      "id": uniqid(),
      "title": "Check item 2",
      "curentStatus": 2,
      "descriptions": [],
      "statuses": ["Not started", "Done", "Fail", "Blocked"]
    },
    {
      "id": uniqid(),
      "title": "Check item 3",
      "curentStatus": 3,
      "descriptions": [],
      "statuses": ["Not started", "Done", "Fail", "Blocked"]
    }
    ,{
      "id": uniqid(),
      "title": "Check item 4",
      "curentStatus": 4,
      "descriptions": [],
      "statuses": ["Not started", "Done", "Fail", "Blocked"]
    }
  ]}

  const addChecklist = () => {
    setTask((prevTask) => ({
      ...prevTask, checkLists: [...prevTask.checkLists, initialCheckList]
    }))
    setHidenCheckLists((prevLists) => [...prevLists, initialCheckList.title])
  }

  const hideToggler = (title: string) => {
    if (hidenCheckLists.includes(title)) return setHidenCheckLists((prevList) => prevList.filter((listName) => listName !== title))
    setHidenCheckLists((prevLists) => [...prevLists, title])
  }
  
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center h-screen w-full">
      <div className="mx-auto max-w-3xl">
        <div className="bg-white shadow-xl sm:rounded-lg w-96">
          <div className=" py-5 ">

            <div className='p-4'>
              <h3 className="text-2xl font-semibold leading-6 text-gray-900">
                {task.taskName}
              </h3>
              <p style={{color: `${chooseTaskStatusColor(task.status)}`}}>
                {task.description[task.status]}
              </p>
            </div>
            <div className='max-h-[60vh] overflow-y-auto  border-t-2'>
              {
                task.checkLists.map((list, i) => {
                  return (
                    <div key={i} className="max-w-xl text-sm text-gray-500 border-b-2 overflow-hidden">
                      <div
                        className='flex items-center justify-between gap-3 p-4 cursor-pointer'
                        onClick={() => hideToggler(list.title)}
                      >
                        <h4 className="text-2xl font-semibold leading-6 text-gray-900 ">
                          {list.title}
                        </h4>
                        <IconArrow style={{ transform: `rotate(${hidenCheckLists.includes(list.title) ? 0 : 180}deg)` }} className='mr-4 transition-all duration-500' />
                      </div>
                      
                      <Transition
                        appear={true}
                        show={hidenCheckLists.includes(list.title)}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="translate-y-full opacity-0 h-0"
                        enterTo="translate-y-0 opacity-100 h-full"
                        leave="transition-all ease-in-out duration-300"
                        leaveFrom="translate-y-0 opacity-100 h-full"
                        leaveTo="translate-y-full opacity-0 h-0"
                      >
                        <Transition.Child>
                          <CheckList isOpen={hidenCheckLists.includes(list.title)} initialCheckList={list.checkList} setTask={setTask} />
                        </Transition.Child>
                      </Transition>
                      
                    </div>
                  )
                })
              }
            </div>

            <button
              type='button'
              className="font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-2 cursor-pointer w-full pt-4 px-4"
              onClick={addChecklist}
            >
              <IconPlus />
              ADD NEW CHECKLIST
            </button>

          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;