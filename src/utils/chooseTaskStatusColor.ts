export const chooseTaskStatusColor = (taskStatus: number) => {
  switch (taskStatus) {
    case 1:
      return 'green'
    case 2:
      return 'orange'
    case 3:
      return 'red'
    case 4:
      return 'grey'
    case 0:
      return 'grey'
    default:
      break;
  }
} 