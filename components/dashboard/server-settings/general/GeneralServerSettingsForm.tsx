import { FormEvent, useState } from 'react';
import { GuildConfig } from '@/models/GuildData';

import Button from '@/components/button/Button';
import ResetLink from '@/components/dashboard/server-settings/common/ResetLink';

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

  const updateConfig = (config: GuildConfig) => {
    setPrefix(config.prefix || '.');
    setDjRole(config.djRole || '');
  };

  return (
    <form onSubmit={send}>
      <div className="input-group">
        <label htmlFor="prefix">
          Prefix:

          <ResetLink
            id={id}
            configKey="prefix"
            saving={saving}
            setSaving={setSaving}
            updateConfig={updateConfig}
          />
        </label>
        <input
          name="prefix"
          id="prefix"
          placeholder="(default: .)"
          disabled={saving}
          onChange={e => setPrefix(e.currentTarget.value)}
          value={prefix}
        />
      </div>

      <div className="input-group">
        <label htmlFor="djRole">
          Name of the DJ role:

          <ResetLink
            id={id}
            configKey="djRole"
            saving={saving}
            setSaving={setSaving}
            updateConfig={updateConfig}
          />
        </label>
        <input
          name="djRole"
          id="djRole"
          disabled={saving}
          onChange={e => setDjRole(e.currentTarget.value)}
          value={djRole}
        />
      </div>

      {saving && <div className="info-message">Saving settings...</div> }
      {success && (
        <div className="success-message">
          Your changes have been saved successfully. It may take a few minutes
          for them to reflect on the bot.
        </div>
      )}
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
