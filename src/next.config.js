module.exports = (phase, { defaultConfig }) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        images: {
            loader: 'akamai',
            path: '',
          },
    }
    return nextConfig
  }