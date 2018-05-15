import v1 from './v1'

function router(app) {
    app.use('/api/v1', v1);
}

export {
    router
}
