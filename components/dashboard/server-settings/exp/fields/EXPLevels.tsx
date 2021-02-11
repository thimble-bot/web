import css from './EXPLevels.module.scss';

import ZeroDataState from '@/components/zero-data-state/ZeroDataState';
import { EXPLevel } from '@/models/GuildData';
import { FormEvent, SetStateAction } from 'react';
import Button from '@/components/button/Button';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export interface EXPLevelsProps {
  saving: boolean;
  levels: EXPLevel[];
  setLevels(value: SetStateAction<EXPLevel[]>): void;
};

const EXPLevels = ({ saving, levels, setLevels }: EXPLevelsProps) => {
  const addLevel = (e: FormEvent) => {
    e.preventDefault();

    setLevels(levels => {
      const newLevels = levels.slice(0);
      newLevels.push({
        amount: 0,
        roleId: ''
      });
      return newLevels;
    });
  };

  const updateLevelAmount = (idx: number, valueString: string) => {
    setLevels(levels => {
      const value = Number.isNaN(parseInt(valueString))
        ? 1
        : parseInt(valueString);

      const newLevels = levels.slice(0);
      newLevels[idx] = {
        ...newLevels[idx],
        amount: value
      };

      return newLevels;
    });
  };

  const updateLevelRoleId = (idx: number, value: string) => {
    setLevels(levels => {
      const newLevels = levels.slice(0);
      newLevels[idx] = {
        ...newLevels[idx],
        roleId: value
      };

      return newLevels;
    });
  };

  const removeLevel = (e: FormEvent, idx: number) => {
    e.preventDefault();

    setLevels(levels => {
      const newLevels = levels.slice(0);
      newLevels.splice(idx, 1);
      return newLevels;
    });
  };

  return (
    <div className={css.container}>
      {!levels.length && (
        <ZeroDataState message="No levels have been created." />
      )}

      {levels.slice(0).map((level, idx) => (
        <div className={css.expGroup} key={idx}>
          <div className="input-group">
            <label htmlFor={`exp-amount-${idx}`}>Amount:</label>
            <input
              name={`exp-amount-${idx}`}
              id={`exp-amount-${idx}`}
              type="number"
              min="0"
              disabled={saving}
              onChange={e => updateLevelAmount(idx, e.currentTarget.value)}
              value={level.amount}
            />
          </div>

          <div className="input-group">
            <label htmlFor={`exp-roleId-${idx}`}>Role ID:</label>
            <input
              name={`exp-roleId-${idx}`}
              id={`exp-roleId-${idx}`}
              disabled={saving}
              onChange={e => updateLevelRoleId(idx, e.currentTarget.value)}
              value={level.roleId}
            />
          </div>

          <Button
            onClick={e => removeLevel(e, idx)}
            small
            danger
            icon={faMinusCircle}
          >Remove</Button>
        </div>
      ))}

      <Button
        onClick={addLevel}
        small
        icon={faPlusCircle}
      >Add</Button>
    </div>
  );
};

export default EXPLevels;
