import css from './IgnoreChannels.module.scss';

import ZeroDataState from '@/components/zero-data-state/ZeroDataState';
import { FormEvent, SetStateAction } from 'react';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/button/Button';

export interface IgnoreChannelsProps {
  saving: boolean;
  ignoreChannels: string[];
  setIgnoreChannels(value: SetStateAction<string[]>): void;
};

const IgnoreChannels = ({ saving, ignoreChannels, setIgnoreChannels }: IgnoreChannelsProps) => {
  const addIgnoreChannel = (e: FormEvent) => {
    e.preventDefault();

    setIgnoreChannels(channels => {
      const newChannels = channels.slice(0);
      newChannels.push('');
      return newChannels;
    });
  };

  const updateIgnoreChannel = (idx: number, value: string) => {
    setIgnoreChannels(channels => {
      const newChannels = channels.slice(0);
      newChannels[idx] = value;
      return newChannels;
    });
  };

  const removeIgnoreChannel = (e: FormEvent, idx: number) => {
    e.preventDefault();

    setIgnoreChannels(channels => {
      const newChannels = channels.slice(0);
      newChannels.splice(idx, 1);
      return newChannels;
    });
  };

  return (
    <div className={css.container}>
      {!ignoreChannels.length && (
        <ZeroDataState message="No ignore channels yet." />
      )}

      {ignoreChannels.map((channel, idx) => (
        <div className="input-group" key={idx}>
          <input
            disabled={saving}
            onChange={e => updateIgnoreChannel(idx, e.currentTarget.value)}
            value={channel}
          />

          <Button
            onClick={e => removeIgnoreChannel(e, idx)}
            small
            danger
            icon={faMinusCircle}
          >Remove</Button>
        </div>
      ))}

      <Button
        onClick={addIgnoreChannel}
        small
        icon={faPlusCircle}
      >Add</Button>
    </div>
  );
};

export default IgnoreChannels;
