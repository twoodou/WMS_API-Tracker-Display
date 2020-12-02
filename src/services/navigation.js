class NavigationService {
  history = undefined;

  init = history => {
    this.history = history;
  };

  getPageHref = page => {
    return page ? `/${page}` : `/`;
  };
}

export const navigationService = new NavigationService();