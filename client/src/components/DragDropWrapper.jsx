import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTasks } from '../context/TaskContext';
import { Task } from './Task';

export function DragDropWrapper({ tasks }) {
  const { reorderTasks } = useTasks();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;
    
    reorderTasks(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-list"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`task ${snapshot.isDragging ? 'dragging' : ''}`}
                    style={{
                      ...provided.draggableProps.style,
                      transform: snapshot.isDragging
                        ? `${provided.draggableProps.style?.transform || ''} rotate(2deg)`
                        : provided.draggableProps.style?.transform,
                    }}
                  >
                    <Task task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}