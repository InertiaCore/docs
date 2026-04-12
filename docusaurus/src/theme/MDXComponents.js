import MDXComponents from '@theme-original/MDXComponents';
import {
  Warning,
  Note,
  Info,
  Tip,
  CodeGroup,
  Card,
  Steps,
  Step,
  Frame,
  ParamField,
  Columns,
  Badge,
} from '@site/src/components/MintlifyCompat';
import { ClientSpecific } from '/snippets/client-specific';
import { CurrentCodeTab } from '/snippets/current-code-tab';
import { ReactSpecific } from '/snippets/react-specific';
import { VueSpecific } from '/snippets/vue-specific';
import { Vue2Specific } from '/snippets/vue2-specific';
import { Vue3Specific } from '/snippets/vue3-specific';
import { SvelteSpecific } from '/snippets/svelte-specific';
import { Svelte4Specific } from '/snippets/svelte4-specific';
import { Svelte5Specific } from '/snippets/svelte5-specific';

export default {
  ...MDXComponents,
  Warning,
  Note,
  Info,
  Tip,
  CodeGroup,
  Card,
  Steps,
  Step,
  Frame,
  ParamField,
  Columns,
  Badge,
  ClientSpecific,
  CurrentCodeTab,
  ReactSpecific,
  VueSpecific,
  Vue2Specific,
  Vue3Specific,
  SvelteSpecific,
  Svelte4Specific,
  Svelte5Specific,
};
