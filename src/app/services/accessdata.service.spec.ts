import { TestBed } from '@angular/core/testing';
import { accessdata } from './accessdata.service';


describe('accessdata.service', () => {
    //beforeEach(() => TestBed.configureTestingModule({}));
    let service: accessdata;
    beforeEach(() => { service = new accessdata(); });
    afterEach(() => { service = null });

    it('should generate valid swimtimes', () => {
        const swimtime = service.generateSwimtime(10, 100, 2);
        expect(swimtime).toBeGreaterThanOrEqual(10);
        expect(swimtime).toBeLessThanOrEqual(100);
        expect(swimtime).toEqual(jasmine.any(Number));
    });

    it('should generate records', () => {
        service.usrEmail = 'test@test.com'
        const record = service.generateRecord();
        expect(record['email']).toEqual(service.usrEmail);
        expect(record['swimtime']).toBeGreaterThanOrEqual(46);
        expect(record['swimtime']).toBeLessThanOrEqual(58);
        expect(record['swimtime']).toEqual(jasmine.any(Number));
    });

});