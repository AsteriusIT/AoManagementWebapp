export const environment = {
    production: false,
    msalConfig: {
        auth: {
            clientId: 'fd9932f2-2fcc-42be-a03e-63d8fc3c3de2',
            authority: 'https://login.microsoftonline.com/f3b3c6c2-ac86-462e-b68e-cfbed01ead3d/',
        },
    },
    apiConfig: {
        scopes: ['user.read'],
        uri: ['https://graph.microsoft.com/v1.0/me', 'https://graph.microsoft.com/v1.0/me/photo/$value'],
    },
};
