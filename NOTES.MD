Są dwa rodzaje nawigacji w React-Navigation

- statyczna oraz dynamiczna
- Passing additional props to a screen is not supported in the static API.

Dynamiczna:

NavigationContainer is a component that manages our navigation tree and contains the navigation state. This component must wrap all the navigators in the app. Usually, we'd render this component at the root of our app, which is usually the component exported from App.js.

Passing additional props:

- Use React context and wrap the navigator with a context provider to pass data to the screens (recommended).

React Native doesn't have a built-in API for navigation like a web browser does. React Navigation provides this for you, along with the iOS and Android gestures and animations to transition between screens.

Stack.Navigator is a component that takes route configuration as its children with additional props for configuration and renders our content.

Each Stack.Screen component takes a name prop which refers to the name of the route and component prop which specifies the component to render for the route. These are the 2 required props.

To specify what the initial route in a stack is, provide an initialRouteName as the prop for the navigator.

To specify screen-specific options, we can pass an options prop to Stack.Screen, and for common options, we can pass screenOptions to Stack.Navigator.

navigation.navigate('nazwa-routa') - przenosi na route (1raz)
navigation.push('nazwa-routa') - This allows us to express the intent to add another route regardless of the existing navigation history
navigation.goBack() - wstecz
navigation.popTo('nazwa-routa') - przenosi na konkretny ekran
navigation.popToTop() - pierwszy ekran stacku
