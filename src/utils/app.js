const application = import.meta.env.VITE_APPLICATION;
const development = import.meta.env.VITE_DEVELOPMENT;
const production = import.meta.env.VITE_PRODUCTION;

const activeConfig = application === 'production' ? production : development;

export default activeConfig;