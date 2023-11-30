#!/bin/sh
get_environment() {
  declare -A branch_env_mapping=(
    ["release/current"]="staging"
    ["develop"]="dev"
    ["master"]="prod"
  )

  branch_name="$1"
  tgs_env=${branch_env_mapping["$branch_name"]}

  if [ -z "$tgs_env" ]; then
    echo "Unsupported branch for deployment"
    exit 1
  fi

  echo "$tgs_env"
}