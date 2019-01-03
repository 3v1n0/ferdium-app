import React from 'react';
import injectSheet, { ThemeProvider } from 'react-jss';
import addons, { makeDecorator } from '@storybook/addons';
import theme from '@meetfranz/theme';

const defaultTheme = {
  name: 'Default',
  variables: theme('default'),
};

const darkTheme = {
  name: 'Dark Mode',
  variables: theme('dark'),
};

const themes = [defaultTheme, darkTheme];

const styles = (theme) => ({
  title: {
    fontSize: 14,
  },
  container: {
    border: theme.inputBorder,
    borderRadius: theme.borderRadiusSmall,
    marginBottom: 20,
    padding: 20,
    background: theme.colorContentBackground,
  },
});

const Container = injectSheet(styles)(({ name, classes, story }) => (
  <article>
    <h1 className={classes.title}>{name}</h1>
    <div className={classes.container}>
      {story}
    </div>
  </article>
));

export default makeDecorator({
  name: 'withTheme',
  parameterName: 'theme',
  // This means don't run this decorator if the notes decorator is not set
  // skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { options }) => {
    const channel = addons.getChannel();

    return (
      <>
        {themes.map(theme => (
          <ThemeProvider theme={theme.variables}>
            <Container story={getStory(context)} name={theme.name} />
          </ThemeProvider>
        ))}
      </>
    );
  }
})
