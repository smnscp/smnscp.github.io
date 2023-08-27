document.addEventListener("DOMContentLoaded", () => {
  const schemeClasses = ["thm-dark", "thm-light"];
  const transitioningClass = "thm-trans";

  const selectScheme = (index) => {
    const rootClasses = document.documentElement.classList;
    rootClasses.remove(...schemeClasses);
    rootClasses.add(schemeClasses[index], transitioningClass);
    setTimeout(() => {
      rootClasses.remove(transitioningClass);
    }, 500);
  };

  /**
   * @param {HTMLInputElement} control
   */
  const activateRangeButtons = (control) => {
    control.previousElementSibling.onclick = () => {
      control.stepDown();
      control.oninput();
    };
    control.nextElementSibling.onclick = () => {
      control.stepUp();
      control.oninput();
    };
  };

  const selectTheme = (index) => {
    const rootClasses = document.documentElement.classList;
    rootClasses.add(transitioningClass);
    if (document.styleSheetSets) {
      document.selectedStyleSheetSet = document.styleSheetSets[index];
    } else {
      const link = document.head.querySelectorAll(
        "link[rel~=stylesheet][title]"
      )[index];
      if (document.themeLink) {
        document.head.removeChild(document.themeLink);
      }
      document.themeLink = document.createElement("link");
      document.themeLink.setAttribute("rel", "stylesheet");
      document.themeLink.setAttribute("href", link.href);
      document.head.appendChild(document.themeLink);
    }
    setTimeout(() => {
      rootClasses.remove(transitioningClass);
    }, 500);
  };

  /**
   * @param {HTMLInputElement} control
   */
  const calibrateThemeSwitch = (control) => {
    control.max =
      document.head.querySelectorAll("link[rel~=stylesheet][title]").length - 1;
  };

  document
    .querySelectorAll("input[data-behavior=scheme-switch]")
    .forEach((control) => {
      control.oninput = () => selectScheme(parseInt(control.value));
      activateRangeButtons(control);
      if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        control.stepUp();
        control.oninput();
      }
    });

  document
    .querySelectorAll("input[data-behavior=theme-switch]")
    .forEach((control) => {
      control.oninput = () => selectTheme(parseInt(control.value));
      activateRangeButtons(control);
      calibrateThemeSwitch(control);
    });
});
