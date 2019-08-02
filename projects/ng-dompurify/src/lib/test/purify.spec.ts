import {dirtyHtml, cleanHtml} from './test-samples/html';
import {purify} from '../purify';

describe('purify', () => {
    it('purifies string value', () => {
        expect(purify(dirtyHtml)).toBe(cleanHtml);
    });

    it('purifies objects', () => {
        const dirtyObject = {
            toString(): string {
                return dirtyHtml;
            },
        };

        expect(purify(dirtyObject)).toBe(cleanHtml);
    });

    it('purifies null', () => {
        expect(purify(null)).toBe('');
    });
});
