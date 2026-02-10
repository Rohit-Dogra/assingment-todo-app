import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useDispatch, useSelector } from 'react-redux'
import { reorderTasks } from '../store/slices/tasksSlice'
import { selectFilteredAndSearchTasks, selectOrder } from '../store/selectors'
import SortableTaskItem from './SortableTaskItem'
import '../styles/TaskList.css'

export default function TaskList() {
  const dispatch = useDispatch()
  const tasks = useSelector(selectFilteredAndSearchTasks)
  const order = useSelector(selectOrder)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = order.indexOf(active.id)
    const newIndex = order.indexOf(over.id)
    if (oldIndex === -1 || newIndex === -1) return
    const newOrder = arrayMove(order, oldIndex, newIndex)
    dispatch(reorderTasks(newOrder))
  }

  return (
    <section className="task-list-section" aria-label="Task list">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={order}
          strategy={verticalListSortingStrategy}
        >
          <ul className="task-list" role="list">
            {tasks.length === 0 ? (
              <li className="task-list-empty">
                <p>No tasks match your filters. Add one or change filters.</p>
              </li>
            ) : (
              tasks.map((task) => (
                <SortableTaskItem key={task.id} task={task} />
              ))
            )}
          </ul>
        </SortableContext>
      </DndContext>
    </section>
  )
}
