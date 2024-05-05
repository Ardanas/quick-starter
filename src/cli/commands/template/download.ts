import ora from 'ora';
import { downloadTemplate } from 'giget';
import { isOverwriteDir } from './prompts';
import { isDirEmpty, ensureDir, emptyDir } from '../../../utils';

export async function download(repo: string, dir: string, isForce: boolean = false) {
    let _isOverwrite = isForce
    ensureDir(dir)
    if (!isForce) {
        const isEmpty = isDirEmpty(dir)
        if (!isEmpty) {
            _isOverwrite = await isOverwriteDir(dir)
            if (_isOverwrite) emptyDir(dir)
        }
    }
    const spinner = ora('waiting download template')
    spinner.start()
    try {
        await downloadTemplate(repo, {
            dir,
            force: _isOverwrite,
            forceClean: true
        })
        spinner.succeed('download template succeed.')
    } catch(err: any) {
        spinner.fail('Request failed...' + err.message)
    }
}