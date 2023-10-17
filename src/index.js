import './css/styles.css';
import dom from './dom';
import handlers from './handlers';

// When page is first loaded, show title from menu link 'All'
dom.showMainTitle(0);

// When page is loaded, show all default projects
dom.showProjects();

// When page is loaded, show all tasks from all default projects
dom.getTasks('all');

dom.responsiveMenu();
handlers.resizeWindow();
handlers.listenClicks();
