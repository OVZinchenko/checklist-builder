import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import uniqid from 'uniqid';
import { Item, Items, Task } from '../types/types'
import { ReactComponent as IconEmpty } from '../icons/icon-empty.svg'
import { ReactComponent as IconChecked } from '../icons/icon-checked.svg'
import { ReactComponent as IconFail } from '../icons/icon-fail.svg'
import { ReactComponent as IconBlocked } from '../icons/icon-blocked.svg'
import { ReactComponent as IconPlus } from '../icons/icon-plus.svg'
import { ReactComponent as IconSubtask } from '../icons/icon-subtask.svg'
import { chooseChecklistStatusColor } from '../utils/chooseChecklistStatusColor';

type Props = {
  initialCheckList: Items,
  setTask: Dispatch<SetStateAction<Task>>,
  isOpen: boolean
}

const CheckList = ({ initialCheckList, setTask, isOpen }: Props) => {

  const [checkList, setCheckList] = useState(initialCheckList)  

  const addItem = () => {
    setCheckList([...checkList, {
      id: uniqid(),
      title: `Check item ${checkList.length + 1}`,
      curentStatus: 1,
      descriptions: [],
      statuses: ['Not started', 'Done', 'Fail', 'Blocked']
    }])
  }

  useEffect(() => {
  const allStatuses = checkList.map((item: Item) => item.curentStatus);

  const noStarted = allStatuses.every((num) => num === 1);
  const done = allStatuses.every((num) => num === 2);
  const inProgress = allStatuses.some((num) => num === 1 || num === 2);
  const hasBlock = allStatuses.some((num) => num === 3);
  const hasFail = allStatuses.some((num) => num === 4);

  if (noStarted) return setTask((prevTask: Task) => ({ ...prevTask, status: 0 }));
  if (done) return setTask((prevTask: Task) => ({ ...prevTask, status: 1 }));
  if (hasFail) return setTask((prevTask: Task) => ({ ...prevTask, status: 3 }));
  if (hasBlock) return setTask((prevTask: Task) => ({ ...prevTask, status: 2 }));
  if (inProgress) return setTask((prevTask: Task) => ({ ...prevTask, status: 4 }));
    
}, [checkList]);

  
  const renderIcon = (status: number, itemId: string) => {

    const changeStatus = () => {
      const newStatusList = checkList.map((item: Item) => {
        if (item.id === itemId) {
          if (item.curentStatus === 4) {
            item.curentStatus = 1
            return item
          }
          item.curentStatus += 1
        }
        return item
      })
      setCheckList(newStatusList)
    }

    switch (status) {
      case 1:
        return <IconEmpty className='cursor-pointer' onClick={changeStatus}/>
      case 2:
        return <IconChecked className='cursor-pointer' onClick={changeStatus}/>
      case 3:
        return <IconFail className='cursor-pointer' onClick={changeStatus}/>
      case 4:
        return <IconBlocked className='cursor-pointer' onClick={changeStatus}/>
      default:
        break;
    }
  }

  return (
    <div className="space-y-5 mb-5 transition-[height]">
      <div className='px-4 pt-4 flex items-center justify-between border-t-2'>
        <div className='flex items-center gap-3'>
          <IconSubtask />
          <p className='text-neutral-900 font-medium text-lg'>Subtask</p>
        </div>
        <p className='font-medium text-xs'>{`${checkList.length} STEPS`}</p>
      </div>
      <div className="space-y-5 pt-5 border-t-2">
        {
          checkList.map((item: Item) => {
            return <div className="relative flex items-center px-4 " key={item.id}>
              {renderIcon(item.curentStatus, item.id)}
              <div className="ml-3 text-sm leading-6">
                <p className="font-medium text-gray-900">
                  {item.title}
                </p>
                <p style={{color: `${chooseChecklistStatusColor(item.curentStatus)}`}} className="text-gray-500">
                  {item.statuses[item.curentStatus - 1]}
                </p>
              </div>
            </div>
          })
        }
      </div>
      <button
        type='button'
        className="font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-2 cursor-pointer mt-5 px-4"
        onClick={addItem}
      >
        <IconPlus />
        ADD NEW ITEM
      </button>
    </div>
  )
}

export default CheckList;