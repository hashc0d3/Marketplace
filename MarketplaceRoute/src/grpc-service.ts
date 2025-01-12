import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, './proto/service.proto');

// Загрузка gRPC Proto-файла
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const exampleService = protoDescriptor.example.ExampleService;

// Реализация gRPC метода
const sayHello = (
    call: grpc.ServerUnaryCall<any, any>,
    callback: grpc.sendUnaryData<any>
) => {
    const { name } = call.request;
    if (!name) {
        callback({
            code: grpc.status.INVALID_ARGUMENT,
            message: 'Name is required',
        });
        return;
    }

    callback(null, { message: `Hello, ${name}!` });
};

// Запуск gRPC сервера
export const startGrpcServer = () => {
    const server = new grpc.Server();
    server.addService(exampleService.service, { SayHello: sayHello });

    const GRPC_PORT = '50051';
    server.bindAsync(
        `0.0.0.0:${GRPC_PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (err: Error | null, port: number) => {
            if (err) {
                console.error('Failed to start gRPC server:', err);
                return;
            }
            console.log(`gRPC server running on http://localhost:${port}`);
            server.start();
        }
    );
};
