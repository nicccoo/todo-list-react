import React from "react";

export const TaskBanner = props => (
  <div>
    <h4 className="bg-primary text-white text-center p-4">
      {props.userName}, Task app. 
      ({props.taskItems.filter(t => !t.done).length}) tasks to do
    </h4>
  </div>
);
