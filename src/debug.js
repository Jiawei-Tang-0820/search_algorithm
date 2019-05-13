import cfg from './config';

function log(message) {
    if (cfg.debug) {
        console.log(message);
    }
}

export default log;