import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import ViteCompression from 'vite-plugin-compression'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    svgr({ svgrOptions: { icon: true } }),
    react(),
    AutoImport({
      imports: [
        'react',
        'react-router-dom',
        // import classNames from 'classnames'
        { from: 'classnames', imports: [['default', 'classNames']] },
        {
          from: 'react',
          imports: [
            'Suspense',
            'lazy',
            'useEffect',
            'useState',
            'useRef',
            'useCallback',
            'useMemo',
            'useContext',
            'useImperativeHandle'
          ]
        }
      ],
      dts: 'src/@types/auto-imports.d.ts',
      include: [/\.[tj]sx?$/, /\.md$/],
      dirs: [
        'src/api/**',
        'src/components/**',
        'src/hooks/**',
        'src/layouts/*/index.tsx',
        'src/providers/**',
        'src/store/**',
        'src/utils/**'
      ]
    }),
    ViteCompression({
      verbose: true,
      disable: true,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  }
})
