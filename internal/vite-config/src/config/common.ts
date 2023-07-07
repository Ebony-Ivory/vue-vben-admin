import { presetTypography, presetUno, presetIcons, transformerDirectives } from 'unocss';
import UnoCSS from 'unocss/vite';
import { type UserConfig } from 'vite';

const commonConfig: UserConfig = {
  server: {
    host: true,
  },
  esbuild: {
    drop: ['debugger'],
  },
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      // TODO: Prevent memory overflow
      maxParallelFileOps: 3,
    },
  },
  plugins: [
    UnoCSS({
      presets: [presetUno(), presetTypography(), presetIcons()],
      transformers: [transformerDirectives()],
      shortcuts: {
        'common-flex': 'flex justify-center items-center',
        'common-flex-col': 'flex justify-center items-center flex-col',
        'border-dev': 'border-1px border-red-500 border-dashed',
      },
    }),
  ],
};

export { commonConfig };
