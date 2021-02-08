import css from './ResetLink.module.scss';

import { GuildConfig } from '@/models/GuildData';
import { ReactNode, useState } from 'react';

export interface ResetLinkProps {
  id: string;
  configKey: string;
  saving: boolean;
  setSaving(state: boolean): void;
  updateConfig(config: GuildConfig): void;
  children?: ReactNode;
};

const ResetLink = ({ id, configKey, saving, setSaving, updateConfig, children }: ResetLinkProps) => {
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ error, setError ] = useState('');

  const handleClick = () => {
    if (loading || saving) {
      return;
    }

    setSaving(true);

    setLoading(true);
    setError('');
    setSuccess(false);

    return fetch(`/api/discord/guilds/${id}?key=${configKey}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(json => {
        if (!json.ok) {
          throw new Error(json.error ?? 'Internal Server Error');
        }

        setSuccess(true);
        setLoading(false);

        setSaving(false);
        updateConfig(json);

        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(err => {
        setError(err.message || 'Unexpected Error');
        setLoading(false);

        setSaving(false);
      });
  };

  return (
    <div className={css.link} onClick={handleClick}>
      <span className={css.label}>{children || '(reset)'}</span>

      {loading && <span>...</span>}
      {success && <span className={css.success}>Field reset successfully.</span>}
      {error && <span className={css.error}>{error}</span>}
    </div>
  );
};

export default ResetLink;
