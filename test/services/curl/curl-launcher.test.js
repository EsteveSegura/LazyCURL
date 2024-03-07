import CurlLauncher from '../../../src/infrastructure/services/curl/curl-launcher'; // Asegúrate de que la ruta de importación sea correcta
import { spawn } from 'child_process';

jest.mock('child_process', () => ({
    spawn: jest.fn(),
}));

describe('CurlLauncher', () => {
    let mockStdout, mockStderr, mockOn;
    beforeEach(() => {
        mockStdout = { on: jest.fn() };
        mockStderr = { on: jest.fn() };
        mockOn = jest.fn();

        spawn.mockImplementation(() => ({
            stdout: mockStdout,
            stderr: mockStderr,
            on: mockOn,
        }));

        jest.spyOn(console, 'log').mockImplementation(() => { });
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
        console.log.mockRestore();
        console.error.mockRestore();
    });

    it('should spawn a child process with the correct command', () => {
        const command = 'curl http://example.com';
        const curlLauncher = new CurlLauncher({ curlCommand: command });

        expect(spawn).toHaveBeenCalledWith(command, { shell: true });
    });

    it('should set up data listeners for stdout and stderr', () => {
        const curlLauncher = new CurlLauncher({ curlCommand: 'curl http://example.com' });
        curlLauncher.debug = true
        curlLauncher.launch();

        expect(mockStdout.on).toHaveBeenCalledWith('data', expect.any(Function));
        expect(mockStderr.on).toHaveBeenCalledWith('data', expect.any(Function));
    });

    it('should set up a close listener for the child process', () => {
        const mockOn = jest.fn();
        spawn.mockImplementation(() => ({
            stdout: mockStdout,
            stderr: mockStderr,
            on: mockOn,
        }));

        const curlLauncher = new CurlLauncher({ curlCommand: 'curl http://example.com' });
        curlLauncher.debug = true
        curlLauncher.launch();

        expect(mockOn).toHaveBeenCalledWith('close', expect.any(Function));
    });

    it('should log data from stdout', () => {
        const curlLauncher = new CurlLauncher({ curlCommand: 'curl http://example.com' });
        curlLauncher.launch();

        const mockDataHandler = mockStdout.on.mock.calls.find(call => call[0] === 'data')[1];
        const testData = 'test output';
        mockDataHandler(testData);

        expect(console.log).toHaveBeenCalledWith(`${testData}`);
    });

    it('should log errors from stderr', () => {
        const curlLauncher = new CurlLauncher({ curlCommand: 'curl http://example.com' });
        curlLauncher.debug = true
        curlLauncher.launch();

        const mockDataHandler = mockStderr.on.mock.calls.find(call => call[0] === 'data')[1];
        const testError = 'test error';
        mockDataHandler(testError);

        expect(console.error).toHaveBeenCalledWith(`stderr: ${testError}`);
    });

    it('should log exit code when process closes', () => {
        const curlLauncher = new CurlLauncher({ curlCommand: 'curl http://example.com' });
        curlLauncher.debug = true
        curlLauncher.launch();

        const mockCloseHandler = mockOn.mock.calls.find(call => call[0] === 'close')[1];
        const exitCode = 0;
        mockCloseHandler(exitCode);

        expect(console.log).toHaveBeenCalledWith(`child process exited with code ${exitCode}`);
    });

    it('should handle spawn errors', () => {
        spawn.mockImplementation(() => {
          throw new Error('Spawn failed');
        });
    
        expect(() => new CurlLauncher({ curlCommand: 'invalid command' })).toThrow('Spawn failed');
      });
    
      it('should handle unexpected data types in stdout', () => {
        const curlLauncher = new CurlLauncher({ curlCommand: 'curl http://example.com' });
        curlLauncher.launch();
    
        const mockDataHandler = mockStdout.on.mock.calls.find(call => call[0] === 'data')[1];
        const testData = { unexpected: 'object' };
        mockDataHandler(testData);
    
        expect(console.log).toHaveBeenCalledWith(`[object Object]`);
      });
    
      it('should handle unexpected data types in stderr', () => {
        const curlLauncher = new CurlLauncher({ curlCommand: 'curl http://example.com' });
        curlLauncher.debug = true
        curlLauncher.launch();
    
        const mockDataHandler = mockStderr.on.mock.calls.find(call => call[0] === 'data')[1];
        const testData = { unexpected: 'object' };
        mockDataHandler(testData);
    
        expect(console.error).toHaveBeenCalledWith(`stderr: [object Object]`);
      });
    
      it('should handle non-zero exit codes gracefully', () => {
        const curlLauncher = new CurlLauncher({ curlCommand: 'curl http://example.com' });
        curlLauncher.debug = true
        curlLauncher.launch();
    
        const mockCloseHandler = mockOn.mock.calls.find(call => call[0] === 'close')[1];
        const nonZeroExitCode = 1;
        mockCloseHandler(nonZeroExitCode);
    
        expect(console.log).toHaveBeenCalledWith(`child process exited with code ${nonZeroExitCode}`);
      });
});
