import env from './config';
import App from './app'

const app: App = new App(env.PORT);

app.listen();