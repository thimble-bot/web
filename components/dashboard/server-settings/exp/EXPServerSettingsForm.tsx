import { FormEvent, useState } from 'react';
import { GuildConfig } from '@/models/GuildData';

import Button from '@/components/button/Button';
import IgnoreChannels from './fields/IgnoreChannels';
import EXPLevels from './fields/EXPLevels';
import { deleteConfigProperty } from '@/lib/discord';

export interface EXPServerSettingsFormProps {
  id: string;
  config: GuildConfig;
  setDisplayEditor(newState: boolean): void;
};

const EXPServerSettingsForm = ({ id, config, setDisplayEditor }: EXPServerSettingsFormProps) => {
  const [ rangeStart, setRangeStart ] = useState(config.exp?.range[0] || 1);
  const [ rangeEnd, setRangeEnd ] = useState(config.exp?.range[1] || 3);

  const [ levels, setLevels ] = useState(config.exp?.levels || []);
  const [ ignoreChannels, setIgnoreChannels ] = useState(config.exp?.ignoreChannels || []);

  const [ saving, setSaving ] = useState(false);
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState(false);

  const send = (e: FormEvent) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    const newConfig: GuildConfig = {
      exp: {
        range: [ rangeStart, rangeEnd ],
        levels
      }
    };

    if (ignoreChannels.length) {
      newConfig.exp.ignoreChannels = ignoreChannels.slice(0);
    }

    setSaving(true);
    setError('');
    setSuccess(false);

    return fetch(`/api/discord/guilds/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(newConfig)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.ok) {
          throw new Error(json.error ?? 'Internal Server Error');
        }

        setSuccess(true);
        setSaving(false);
      })
      .catch(err => {
        setError(err.message || 'Unexpected Error');
        setSaving(false);
      });
  };

  const disable = (e: FormEvent) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    if (!config.exp) {
      return setDisplayEditor(false);
    }

    setSaving(true);
    setError('');
    setSuccess(false);

    return deleteConfigProperty(id, 'exp')
      .then(() => setDisplayEditor(false))
      .catch(err => {
        setError(err);
        setSaving(false);
      });
  };

  return (
    <form onSubmit={send}>
      <h3>RNG range:</h3>
      <p>Specifies the range of the random per-message experience gain.</p>

      <div className="input-group range">
        <label htmlFor="range-from">From:</label>
        <input
          type="number"
          name="range-from"
          id="range-from"
          min="1"
          disabled={saving}
          onChange={e => setRangeStart(parseInt(e.currentTarget.value) || 1)}
          value={rangeStart}
        />

        <label htmlFor="range-to">To:</label>
        <input
          type="number"
          name="range-to"
          id="range-to"
          min="1"
          disabled={saving}
          onChange={e => setRangeEnd(parseInt(e.currentTarget.value) || 1)}
          value={rangeEnd}
        />
      </div>

      <h3>Experience Levels</h3>
      <p>
        A set of level-role pairs. Specify what role ID should someone get when
        they've gained a set number of experience.
      </p>

      <EXPLevels
        saving={saving}
        levels={levels}
        setLevels={setLevels}
      />

      <h3>Ignore Channels</h3>
      <p>
        A list of channel IDs where members can't gain experience points.
      </p>

      <IgnoreChannels
        saving={saving}
        ignoreChannels={ignoreChannels}
        setIgnoreChannels={setIgnoreChannels}
      />

      {saving && <div className="info-message">Saving settings...</div>}
      {success && (
        <div className="success-message">
          Your changes have been saved successfully. It may take a few minutes
          for them to reflect on the bot.
        </div>
      )}
      {error && <div className="error-message">{error}</div>}

      <div className="input-group buttons">
        <Button disabled={saving} onClick={send} primary>
          Save
        </Button>

        <Button disabled={saving} onClick={disable} danger>
          Disable EXP System
        </Button>
      </div>
    </form>
  );
};

export default EXPServerSettingsForm;
