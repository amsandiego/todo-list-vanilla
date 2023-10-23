import projects from './projects';
import dom from './dom';

const tasks = (() => {
  class Task {
    constructor(title, description, date, priority, projectIndex, taskIndex) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.priority = priority;
      this.projectIndex = projectIndex;
      this.taskIndex = taskIndex;
      this.completed = false;
    }
  }

  const addTask = (
    title,
    description,
    date,
    priority,
    projectIndex,
    taskIndex
  ) => {
    const task = new Task(
      title,
      description,
      date,
      priority,
      projectIndex,
      taskIndex
    );

    projects.projectList[projectIndex].tasks.push(task);
    dom.getTasks('project', projectIndex);
  };

  const editTask = (
    title,
    description,
    date,
    priority,
    projectIndex,
    taskIndex
  ) => {
    projects.projectList[projectIndex].tasks[taskIndex].title = title;
    projects.projectList[projectIndex].tasks[taskIndex].description =
      description;
    projects.projectList[projectIndex].tasks[taskIndex].date = date;
    projects.projectList[projectIndex].tasks[taskIndex].priority = priority;
    dom.getTasks('project', projectIndex);
  };

  const deleteTask = (projectIndex, taskIndex) => {
    if (projectIndex > -1) {
      projects.projectList[projectIndex].tasks.splice(taskIndex, 1);
      dom.getTasks('all');
    }
  };

  const toggleTaskCompletion = (projectIndex, taskIndex, selectedLink) => {
    let clickedLink;
    console.log(selectedLink);
    projects.projectList[projectIndex].tasks[taskIndex].completed =
      !projects.projectList[projectIndex].tasks[taskIndex].completed;

    if (selectedLink.classList.contains('project')) {
      clickedLink = 'project';
    } else {
      clickedLink = selectedLink.getAttribute('data-title');
    }
    dom.getTasks(clickedLink, projectIndex);
  };

  return {
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompletion,
  };
})();

export default tasks;
