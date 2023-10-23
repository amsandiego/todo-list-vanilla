import dom from './dom';
import tasks from './tasks';

const handlers = (() => {
  // Resize menu depending on window size
  const resizeWindow = () => {
    window.addEventListener('resize', dom.responsiveMenu);
  };

  const listenClicks = () => {
    let projectIndex;
    let taskIndex;

    document.addEventListener('click', (event) => {
      const { target } = event;
      const modalMainTitle = document.querySelector('.modal-main-title');
      const selectedLink = document.querySelector('.selected-link');
      const linkIndex = parseInt(target.getAttribute('data-link-index'), 10);

      // Toggle side menu
      if (target.classList.contains('toggle-menu')) {
        dom.toggleMenu();
      }

      // Style clicked link
      if (target.classList.contains('select')) {
        dom.selectLink(target, linkIndex);
        dom.changeMainTitle(target, linkIndex);
      }

      // Modal for adding project
      if (target.classList.contains('add-project')) {
        dom.manipulateModal('show', 'Add Project', 'Add');

        // Modals for project editing and deleting
      } else if (target.classList.contains('project-icon')) {
        projectIndex = parseInt(target.getAttribute('data-link-index'), 10);

        // Editing project
        if (target.classList.contains('edit-project')) {
          dom.manipulateModal('show', 'Edit Project', 'Edit', projectIndex);

          // Deleting project
        } else if (target.classList.contains('delete-project')) {
          dom.manipulateModal('show', 'Delete Project', 'Delete', projectIndex);
        }
      }

      // Modals for tasks editing, deleting, and info
      if (target.classList.contains('task-icon')) {
        projectIndex = parseInt(target.getAttribute('data-project-index'), 10);
        taskIndex = parseInt(target.getAttribute('data-task-index'), 10);

        // Add task
        if (target.classList.contains('add-task')) {
          dom.manipulateModal('show', 'Add Task', 'Add');

          // Edit task
        } else if (target.classList.contains('edit-task')) {
          dom.manipulateModal(
            'show',
            'Edit Task',
            'Edit',
            projectIndex,
            taskIndex
          );

          // Delete task
        } else if (target.classList.contains('delete-task')) {
          dom.manipulateModal(
            'show',
            'Delete Task',
            'Delete',
            projectIndex,
            taskIndex
          );

          // Show task info
        } else if (target.classList.contains('fa-circle-info')) {
          dom.manipulateModal('show', 'Task Info', '', projectIndex, taskIndex);
        }
      }

      // Validate modal
      if (target.classList.contains('confirm-modal')) {
        // Validate modal for adding
        if (target.textContent === 'Add') {
          projectIndex = parseInt(
            selectedLink.getAttribute('data-link-index'),
            10
          );
          dom.validateModal('add', projectIndex, '', selectedLink);

          // Validate modal for editing
        } else if (target.textContent === 'Edit') {
          // Edit project
          if (modalMainTitle.textContent === 'Edit Project') {
            dom.validateModal('edit', projectIndex, '', selectedLink);

            // Edit task
          } else if (modalMainTitle.textContent === 'Edit Task') {
            dom.validateModal('edit', projectIndex, taskIndex, selectedLink);
          }

          // Validate modal for deleting
        } else if (target.textContent === 'Delete') {
          const projectDeletionText = document.querySelector(
            '.project-deletion-text'
          );

          // Delete project
          if (!projectDeletionText.classList.contains('hide')) {
            projectIndex = parseInt(
              selectedLink.getAttribute('data-link-index'),
              10
            );
            dom.validateModal('delete', projectIndex, '', selectedLink);
            dom.changeMainTitle(target, 0); // After deleting a project - change icon to 'fa-calendar-alt' (menu link 'All')
            dom.showMainTitle(0); // After deleting a project - show main title as 'All'
            dom.getTasks('all'); // After deleting a project - show all tasks from all remaining projects

            // Delete task
          } else if (projectDeletionText.classList.contains('hide')) {
            dom.validateModal('delete', projectIndex, taskIndex, selectedLink);
          }
        }
      }

      // Close Modal
      if (target.classList.contains('close')) {
        dom.manipulateModal('close');
      }

      // Mark Task as Completed
      if (
        target.classList.contains('task-div') ||
        target.classList.contains('fa-circle') ||
        target.classList.contains('fa-circle-check') ||
        target.classList.contains('task-text')
      ) {
        projectIndex = parseInt(target.getAttribute('data-project-index'), 10);
        taskIndex = parseInt(target.getAttribute('data-task-index'), 10);
        tasks.toggleTaskCompletion(projectIndex, taskIndex, selectedLink);
      }
    });
  };

  return {
    resizeWindow,
    listenClicks,
  };
})();

export default handlers;
