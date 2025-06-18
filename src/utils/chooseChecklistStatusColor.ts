export const chooseChecklistStatusColor = (checklistStatus: number) => {
  switch (checklistStatus) {
    case 1:
      return 'grey'
    case 2:
      return 'green'
    case 3:
      return 'orange'
    case 4:
      return 'red'
    default:
      break;
  }
} 