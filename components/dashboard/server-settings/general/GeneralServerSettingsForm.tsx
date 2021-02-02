import Button from '@/components/button/Button';
import { GuildConfig } from '@/models/GuildData';
import { FormEvent, useState } from 'react';

export interface GeneralServerSettingsFormProps {
  id: string;
  config: GuildConfig;
};

const GeneralServerSettingsForm = ({ id, config }: GeneralServerSettingsFormProps) => {
  const [ prefix, setPrefix ] = useState(config.prefix || '.');
  const [ djRole, setDjRole ] = useState(config.djRole || '');

  const [ saving, setSaving ] = useState(false);
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState(false);

  const send = (e: FormEvent) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    const newConfig: GuildConfig = {};

    if (prefix.trim().length) {
      newConfig.prefix = prefix;
    }

    if (djRole.trim().length) {
      newConfig.djRole = djRole;
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

  return (
    <form onSubmit={send}>
      <div className="input-group">
        <label htmlFor="prefix">Prefix:</label>
        <input
          name="prefix"
          id="prefix"
          placeholder="(default: .)"
          disabled={saving}
          onChange={e => setPrefix(e.currentTarget.value)}
          defaultValue={prefix}
        />
      </div>

      <div className="input-group">
        <label htmlFor="djRole">DJ role (name):</label>
        <input
          name="djRole"
          id="djRole"
          disabled={saving}
          onChange={e => setDjRole(e.currentTarget.value)}
          defaultValue={djRole}
        />
      </div>

      {saving && <div className="info-message">Saving settings...</div> }
      {success && <div className="success-message">Settings saved successfully!</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="input-group">
        <Button disabled={saving} primary>
          Save
        </Button>
      </div>
    </form>
  );
};

export default GeneralServerSettingsForm;
