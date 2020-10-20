export const natsWrapper = {
    client : {
        publish: (subject:string, data: string, call:()=> void)=> {
                call();
        },
    },
};