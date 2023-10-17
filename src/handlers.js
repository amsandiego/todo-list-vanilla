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
    });
  };

  return {
    resizeWindow,
    listenClicks,
  };
})();

export default handlers;
