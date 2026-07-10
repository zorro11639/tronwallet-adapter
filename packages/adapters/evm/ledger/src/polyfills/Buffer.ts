import { Buffer } from 'buffer/index.js';

if (typeof window !== 'undefined' && window.Buffer === undefined) {
    (window as any).Buffer = Buffer;
}

export {};
