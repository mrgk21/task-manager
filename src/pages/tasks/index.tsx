import { faBars, faCircleCheck, faExclamation, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useState } from "react";
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "react-beautiful-dnd";

interface SingleTaskProps {
	id: number;
	index: number;
	text: string;
}

const Task = memo(({ id, text, index }: SingleTaskProps) => {
	const [isCompleted, setIsCompleted] = useState(false);
	return (
		<Draggable draggableId={id.toString()} index={index}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.draggableProps}>
					<div className="flex items-center p-2 px-5 space-x-3 dark:border-black border w-[500px] h-[50px] rounded-md shadow-lg ">
						<span {...provided.dragHandleProps}>
							<FontAwesomeIcon icon={faBars} />
						</span>
						<div className="flex flex-grow  items-center">
							<span className="text-xl">{text}</span>
							<div className="space-x-2 ml-auto">
								{isCompleted ? (
									<FontAwesomeIcon
										icon={faCircleCheck}
										className="text-green-500 hover:cursor-pointer w-[20px] text-center"
										onClick={() => setIsCompleted(false)}
									/>
								) : (
									<FontAwesomeIcon
										icon={faExclamation}
										className="text-yellow-500 hover:cursor-pointer w-[20px] text-center"
										onClick={() => setIsCompleted(true)}
									/>
								)}

								<span className="hover:text-red-500 hover:cursor-pointer">
									<FontAwesomeIcon icon={faTrash} />
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
});

const data = [
	{ id: 1, text: "hello guys" },
	{ id: 2, text: "hello again" },
	{ id: 3, text: "hello random text" },
	{ id: 4, text: "end of list" },
];

const Tasks = () => {
	const [list, setList] = useState(data);

	const onDragEnd: OnDragEndResponder = useCallback(
		({ source, destination }) => {
			if (!destination) return;
			console.log({ destination, source });

			if (
				destination.droppableId === source.droppableId &&
				destination.index === source.index
			)
				return;

			const newList = structuredClone(list) as typeof data;
			const [draggedItem] = newList.splice(source.index, 1);
			newList.splice(destination.index, 0, draggedItem);

			setList(newList);
		},
		[list],
	);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable-tasks">
				{(provided) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className="border border-black"
					>
						<div className="flex flex-col mt-20  text-black">
							{list.map((item, index) => (
								<Task {...item} key={item.id} index={index} />
							))}
						</div>
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Tasks;
