const getConfig = () => {
    const prod = {
        url: {
            API_URL: 'https://app.tacent.io/api/v1/',
            AUTH_API_URL: 'https://app.tacent.io/o/',
            CLIENT_ID: 'tdb9FtZxJkiB1G41rJL81Px7cDf6xXawDNOcFQUv',
            MEDIA_ROOT: '',

        },
    };
    
    const stag = {
        url: {
            API_URL: 'https://app.tacent.io/api/v1/',
            AUTH_API_URL: 'https://app.tacent.io/o/',
            CLIENT_ID: 'tdb9FtZxJkiB1G41rJL81Px7cDf6xXawDNOcFQUv',
            MEDIA_ROOT: '',

        },
    };
    
    const dev = {
        url: {
            API_URL: 'http://localhost:8000/api/v1/',
            MEDIA_ROOT: 'http://localhost:8000',
            AUTH_API_URL: 'http://localhost:8000/o/',
            CLIENT_ID: 'tdb9FtZxJkiB1G41rJL81Px7cDf6xXawDNOcFQUv',
        },
    };

    if (process.env.REACT_APP_STAGE === 'staging') {
        return stag;
    }

    if (process.env.NODE_ENV === 'development') {
        console.log('inf dev')
        return dev;
    }
    
    if (process.env.NODE_ENV === 'production') {
        return prod;
    }
}

const config = getConfig()

export {config}
