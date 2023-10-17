import dom from './dom';

const projects = (() => {
  let projectList = [];

  // Get default projects and tasks from local storage
  if (!localStorage.getItem('projects')) {
    projectList = [
      {
        title: 'Work',
        tasks: [
          {
            title: 'Study Redux 📖',
            description:
              'Read through Redux documentation and practice with examples',
            date: '2023-10-18',
            priority: 'high',
            projectIndex: 0,
            taskIndex: 0,
            completed: false,
          },
        ],
      },
      {
        title: 'Personal',
        tasks: [
          {
            title: 'Visit a new cafe ☕',
            description:
              'Longer description of demo task, to show this surprisingly nice scrollbar',
            date: '2023-10-19',
            priority: 'low',
            projectIndex: 1,
            taskIndex: 0,
            completed: false,
          },
        ],
      },
    ];
  } else {
    projectList = JSON.parse(localStorage.getItem('projects'));
  }

  class Project {
    constructor(title) {
      this.title = title;
      this.tasks = [];
    }
  }

  const addProject = (title) => {
    const project = new Project(title);
    projectList.push(project);
    dom.showProjects();
  };

  const editProject = (title, index, link) => {
    projectList[index].title = title;
    dom.showProjects();
    dom.selectLink(link, index, 'edit');
  };

  const deleteProject = (index) => {
    if (index > -1) {
      projectList.splice(index, 1);
    }
    dom.showProjects();
  };

  return {
    projectList,
    addProject,
    editProject,
    deleteProject,
  };
})();

export default projects;
