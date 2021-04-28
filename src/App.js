import React, { useState, useEffect } from "react";
import { TaskRow } from "./components/TaskRow";
import { TaskBanner } from "./components/TaskBanner"
import { TaskCreator } from "./components/TaskCreator"
import { VisibilityControl } from "./components/VisibilityControl"

function App() {
  const [userName, setUserName] = useState("Nico");
  const [taskItems, setTaskItems] = useState([
    {
      name: "Task One",
      done: false,
    },
    {
      name: "Task Two",
      done: false,
    },
    {
      name: "Task Three",
      done: true,
    },
    {
      name: "Task Four",
      done: true,
    },
  ]);
  
  const [showCompleted, setShowCompleted] = useState(true)

  useEffect (() => {
    let data = localStorage.getItem('tasks');
    if (data != null) {
      setTaskItems(JSON.parse(data))
    } else {
      setUserName('Nico')
      setTaskItems([
        {
          name: "Task One Example",
          done: false,
        },
        {
          name: "Task Two Example",
          done: false,
        },
        {
          name: "Task Three Example",
          done: true,
        },
        {
          name: "Task Four Example",
          done: true,
        }
      ])
      setShowCompleted(true);
    }
  }, [])

    useEffect(() => {

      localStorage.setItem('tasks', JSON.stringify(taskItems))

    },[taskItems])

  const addNewTask = taskName => {
    if (!taskItems.find(t => t.name === taskName)) {
      setTaskItems([...taskItems, {name: taskName, done: false}]);
    } 
  }

  const toggleTask = task => 
    setTaskItems(taskItems.map(t => (t.name === task.name ? {...t, done:!t.done} :t)));
  
  const taskTableRows = (doneValue) =>
      taskItems
      .filter(t => t.done === doneValue)
      .map((task) => <TaskRow task={task} key={task.name} toggleTask={toggleTask}/>);


  return (
    <div className="App">
      <TaskBanner userName={userName} taskItems={taskItems}/>
      <TaskCreator callback={addNewTask}/>
      <table className="table table-striped table-bordered lg-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>One</th>
          </tr>
        </thead>
        <tbody>{taskTableRows(false)}</tbody>
      </table>

      <div className="bg-secondary-text-white text-center p-2">
      <VisibilityControl 
        description="Completed Tasks"
        isCheked={showCompleted}
        callback={checked => setShowCompleted(checked)}
      />
      </div>

      {
        showCompleted && (
          <table className="table table-striped table-bordered lg-5">
            <thead>
              <tr>
                <th>Description</th>
                <th>One</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
        )
      }

    </div>
  );
}

export default App;
