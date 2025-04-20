import { ValidationError } from '../validators/validation.error';
import ValidatorRules, { isEmpty } from '../validators/validator-rules';

describe('ValidatorRules Unit Tests', () => {
  describe('required rule', () => {
    it('should throw an error when value is undefined', () => {
      expect(() => {
        ValidatorRules.values(undefined, 'field').required();
      }).toThrow(new ValidationError('The field is required'));
    });

    it('should throw an error when value is null', () => {
      expect(() => {
        ValidatorRules.values(null, 'field').required();
      }).toThrow(new ValidationError('The field is required'));
    });

    it('should throw an error when value is empty string', () => {
      expect(() => {
        ValidatorRules.values('', 'field').required();
      }).toThrow(new ValidationError('The field is required'));
    });

    it('should not throw an error when value is valid', () => {
      expect.assertions(0);
      ValidatorRules.values('value', 'field').required();
      ValidatorRules.values(0, 'field').required();
      ValidatorRules.values(false, 'field').required();
    });
  });

  describe('string rule', () => {
    it('should throw an error when value is not a string', () => {
      expect(() => {
        ValidatorRules.values(5, 'field').string();
      }).toThrow(new ValidationError('The field must be a string'));

      expect(() => {
        ValidatorRules.values({}, 'field').string();
      }).toThrow(new ValidationError('The field must be a string'));

      expect(() => {
        ValidatorRules.values(true, 'field').string();
      }).toThrow(new ValidationError('The field must be a string'));
    });

    it('should not throw an error when value is a string', () => {
      expect.assertions(0);
      ValidatorRules.values('value', 'field').string();
    });

    it('should not throw an error when value is null or undefined', () => {
      expect.assertions(0);
      ValidatorRules.values(null, 'field').string();
      ValidatorRules.values(undefined, 'field').string();
    });
  });

  describe('maxLength rule', () => {
    it('should throw an error when string length is greater than max', () => {
      expect(() => {
        ValidatorRules.values('12345', 'field').maxLength(3);
      }).toThrow(
        new ValidationError(
          'The field must be less or equal than 3 characters',
        ),
      );
    });

    it('should not throw an error when string length is less than max', () => {
      expect.assertions(0);
      ValidatorRules.values('123', 'field').maxLength(3);
      ValidatorRules.values('12', 'field').maxLength(3);
    });

    it('should not throw an error when string length equals max', () => {
      expect.assertions(0);
      ValidatorRules.values('123', 'field').maxLength(3);
    });

    it('should not throw an error when value is null or undefined', () => {
      expect.assertions(0);
      ValidatorRules.values(null, 'field').maxLength(5);
      ValidatorRules.values(undefined, 'field').maxLength(5);
    });
  });

  describe('boolean rule', () => {
    it('should throw an error when value is not a boolean', () => {
      expect(() => {
        ValidatorRules.values('true', 'field').boolean();
      }).toThrow(new ValidationError('The field must be a boolean'));

      expect(() => {
        ValidatorRules.values(5, 'field').boolean();
      }).toThrow(new ValidationError('The field must be a boolean'));

      expect(() => {
        ValidatorRules.values({}, 'field').boolean();
      }).toThrow(new ValidationError('The field must be a boolean'));
    });

    it('should not throw an error when value is a boolean', () => {
      expect.assertions(0);
      ValidatorRules.values(true, 'field').boolean();
      ValidatorRules.values(false, 'field').boolean();
    });

    it('should not throw an error when value is null or undefined', () => {
      expect.assertions(0);
      ValidatorRules.values(null, 'field').boolean();
      ValidatorRules.values(undefined, 'field').boolean();
    });
  });

  describe('combination of rules', () => {
    it('should validate with combined rules', () => {
      expect.assertions(0);
      ValidatorRules.values('test value', 'field')
        .required()
        .string()
        .maxLength(20);
    });

    it('should throw the first error when multiple validations fail', () => {
      expect(() => {
        ValidatorRules.values(null, 'field').required().string();
      }).toThrow(new ValidationError('The field is required'));

      expect(() => {
        ValidatorRules.values(5, 'field').required().string();
      }).toThrow(new ValidationError('The field must be a string'));
    });
  });

  describe('isEmpty function', () => {
    it('should return true for null or undefined values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isEmpty('')).toBe(false);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(false)).toBe(false);
      expect(isEmpty({})).toBe(false);
    });
  });
});
