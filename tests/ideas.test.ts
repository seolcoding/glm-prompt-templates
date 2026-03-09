import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('프로젝트 구조', () => {
  const projectRoot = path.join(__dirname, '..');

  it('필수 디렉토리가 존재해야 함', () => {
    const requiredDirs = ['docs', 'state', 'data', 'apps', 'tests'];
    requiredDirs.forEach(dir => {
      expect(fs.existsSync(path.join(projectRoot, dir))).toBe(true);
    });
  });

  it('아이디어 데이터베이스에 최소 3개 아이디어가 있어야 함', () => {
    const ideasPath = path.join(projectRoot, 'data/ideas.json');
    const content = fs.readFileSync(ideasPath, 'utf-8');
    const data = JSON.parse(content);
    expect(data.ideas.length).toBeGreaterThanOrEqual(3);
  });

  it('각 아이디어에 필수 필드가 있어야 함', () => {
    const ideasPath = path.join(projectRoot, 'data/ideas.json');
    const content = fs.readFileSync(ideasPath, 'utf-8');
    const data = JSON.parse(content);

    const requiredFields = ['id', 'title', 'problem_statement', 'buyer_persona', 'scores'];
    data.ideas.forEach((idea: any) => {
      requiredFields.forEach(field => {
        expect(idea).toHaveProperty(field);
      });
    });
  });

  it('오퍼가 정의되어 있어야 함', () => {
    const offersPath = path.join(projectRoot, 'data/offers.json');
    const content = fs.readFileSync(offersPath, 'utf-8');
    const data = JSON.parse(content);
    expect(data.offers.length).toBeGreaterThan(0);
  });

  it('실험이 정의되어 있어야 함', () => {
    const expPath = path.join(projectRoot, 'data/experiments.json');
    const content = fs.readFileSync(expPath, 'utf-8');
    const data = JSON.parse(content);
    expect(data.experiments.length).toBeGreaterThan(0);
  });
});
