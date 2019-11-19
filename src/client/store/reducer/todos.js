
export default function todos(states = [], action) {
    switch (action.type) {
      case 'ADD_TODO':
        return states.concat([action.text]);
      default:
        return states;
    }
  }