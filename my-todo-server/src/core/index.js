export * from './ValidationError';
export * from './Issue';

export const jwtConfig = { secret: 'my-secret' };

export const idGenerator = (() => {
    let id = 0;
    return {
        next: () => ++id
    }
}) ();
