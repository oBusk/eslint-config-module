export default {
  "**/*.js": (filenames) => [
    "tsc -p jsconfig.json --noEmit",
    `prettier --write ${filenames.join(" ")}`,
  ],
  "**/*.{md,json,yml}": ["prettier --write"],
};
