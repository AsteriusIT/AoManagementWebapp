export const environment = {
    production: false,
    msalConfig: {
        auth: {
            clientId: '4e0805f9-874d-45bd-ac84-b1e320457886',
            authority: 'https://login.microsoftonline.com/f3b3c6c2-ac86-462e-b68e-cfbed01ead3d/',
        },
    },
    apiConfig: {
        scopes: ['user.read'],
        uri: ['https://graph.microsoft.com/v1.0/me', 'https://graph.microsoft.com/v1.0/me/photo/$value'],
    },
};
